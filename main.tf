# Arquivo principal do projeto: main.tf

provider "aws" {
  region = var.aws_region
}

module "s3_static_site" {
  source      = "./modules/s3"
  bucket_name = var.bucket_name
}

module "acm" {
  source         = "./modules/acm"
  domain_name    = var.domain_name
  hosted_zone_id = var.hosted_zone_id
}

module "cloudfront" {
  source                        = "./modules/cloudfront"
  domain_name                   = var.domain_name
  hosted_zone_id               = var.hosted_zone_id
  acm_certificate_arn          = module.acm.certificate_arn
  origin_access_identity       = module.s3_static_site.origin_access_identity
  site_bucket_regional_domain_name = module.s3_static_site.bucket_regional_domain_name
}


