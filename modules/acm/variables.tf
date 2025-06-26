variable "domain_name" {
  description = "Domínio para o certificado SSL"
  type        = string
}

variable "hosted_zone_id" {
  description = "ID da zona hospedada no Route 53"
  type        = string
}
