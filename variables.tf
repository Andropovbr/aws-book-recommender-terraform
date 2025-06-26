variable "aws_region" {
  description = "Região da AWS"
  type        = string
  default     = "us-east-1"
}

variable "bucket_name" {
  description = "Nome do bucket S3"
  type        = string
}

variable "domain_name" {
  description = "Domínio para o site (ex: meuportfolio.com)"
  type        = string
}

variable "hosted_zone_id" {
  description = "ID da zona hospedada no Route 53"
  type        = string
}
