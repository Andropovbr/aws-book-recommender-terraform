##### modules/cloudfront/outputs.tf #####

output "cloudfront_domain_name" {
  value       = aws_cloudfront_distribution.website.domain_name
  description = "Domain name of the CloudFront distribution"
}

# output "www_bucket_name" {
#   value       = aws_s3_bucket.www_redirect.id
#   description = "Bucket used for redirecting www subdomain"
# }

output "route53_main_record" {
  value       = aws_route53_record.main.fqdn
  description = "Route53 record for apex domain"
}

# output "route53_www_record" {
#   value       = aws_route53_record.www.fqdn
#   description = "Route53 record for www subdomain"
# }