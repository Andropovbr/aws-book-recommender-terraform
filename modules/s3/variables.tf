variable "bucket_name" {
  description = "Nome do bucket S3 para hospedar o site"
  type        = string
}
variable "aws_region" {
  description = "Região AWS onde o bucket S3 será criado"
  type        = string
  default     = "us-east-1"
}