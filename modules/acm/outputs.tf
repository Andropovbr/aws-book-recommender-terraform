output "certificate_arn" {
  description = "ARN do certificado ACM validado"
  value       = aws_acm_certificate_validation.cert_validation.certificate_arn
  #value       = aws_acm_certificate.cert.arn
}
