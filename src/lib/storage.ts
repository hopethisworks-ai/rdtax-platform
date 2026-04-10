/**
 * Unified storage abstraction — supports S3 and Supabase Storage.
 * All file access uses signed URLs; no direct public bucket access.
 */
import {
  S3Client,
  PutObjectCommand,
  GetObjectCommand,
  DeleteObjectCommand,
} from "@aws-sdk/client-s3";
import { getSignedUrl } from "@aws-sdk/s3-request-presigner";

const PROVIDER = process.env.STORAGE_PROVIDER ?? "s3";

// ── S3 client ─────────────────────────────────────────────────────────────────
let s3Client: S3Client | null = null;
function getS3(): S3Client {
  if (!s3Client) {
    s3Client = new S3Client({
      region: process.env.AWS_REGION ?? "us-east-1",
      credentials: {
        accessKeyId: process.env.AWS_ACCESS_KEY_ID ?? "",
        secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY ?? "",
      },
    });
  }
  return s3Client;
}

const BUCKET = process.env.AWS_S3_BUCKET ?? process.env.SUPABASE_STORAGE_BUCKET ?? "";

export async function uploadFile(
  key: string,
  body: Buffer | Uint8Array,
  contentType: string
): Promise<string> {
  if (PROVIDER === "s3") {
    const cmd = new PutObjectCommand({
      Bucket: BUCKET,
      Key: key,
      Body: body,
      ContentType: contentType,
      ServerSideEncryption: "AES256",
    });
    await getS3().send(cmd);
    return key;
  }
  throw new Error(`Storage provider ${PROVIDER} not fully configured`);
}

export async function getSignedDownloadUrl(
  key: string,
  expiresInSeconds = 900 // 15 min default
): Promise<string> {
  if (PROVIDER === "s3") {
    const cmd = new GetObjectCommand({ Bucket: BUCKET, Key: key });
    return getSignedUrl(getS3(), cmd, { expiresIn: expiresInSeconds });
  }
  throw new Error(`Storage provider ${PROVIDER} not fully configured`);
}

export async function deleteFile(key: string): Promise<void> {
  if (PROVIDER === "s3") {
    const cmd = new DeleteObjectCommand({ Bucket: BUCKET, Key: key });
    await getS3().send(cmd);
    return;
  }
  throw new Error(`Storage provider ${PROVIDER} not fully configured`);
}

export function generateStorageKey(
  clientId: string,
  engagementId: string,
  filename: string
): string {
  const timestamp = Date.now();
  const safe = filename.replace(/[^a-zA-Z0-9._-]/g, "_");
  return `clients/${clientId}/engagements/${engagementId}/${timestamp}_${safe}`;
}
