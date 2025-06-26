output "bucket_domain_name" {
  description = "URL do site estático hospedado no S3"
  value       = aws_s3_bucket.static_site.bucket_domain_name
}

output "origin_access_identity" {
  value       = aws_cloudfront_origin_access_identity.oai.cloudfront_access_identity_path
  description = "CloudFront Origin Access Identity path"
}

output "bucket_regional_domain_name" {
  value       = aws_s3_bucket.static_site.bucket_regional_domain_name
  description = "S3 bucket regional domain name"
}
