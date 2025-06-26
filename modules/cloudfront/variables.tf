##### modules/cloudfront/variables.tf #####

variable "domain_name" {
  type        = string
  description = "The apex domain name (e.g. andresantos.click)"
}

variable "hosted_zone_id" {
  type        = string
  description = "The Route 53 hosted zone ID for the domain"
}

variable "acm_certificate_arn" {
  type        = string
  description = "ARN of the validated ACM certificate"
}

variable "origin_access_identity" {
  type        = string
  description = "The CloudFront origin access identity ID"
}

variable "site_bucket_regional_domain_name" {
  type        = string
  description = "Regional domain name of the S3 bucket used for the site"
}