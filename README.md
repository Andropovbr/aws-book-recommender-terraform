# 📚 Recomendador de Livros - Site Estático com AWS

Este é um projeto de site estático hospedado na AWS que serve como base para um sistema de recomendação de livros. O objetivo principal é praticar a criação de infraestrutura como código (IaC) com Terraform, usando serviços como S3, CloudFront, Route 53 e ACM. O conteúdo HTML está localizado na pasta `site/`.

## 🚀 Tecnologias Utilizadas

- **Terraform**: Provisionamento da infraestrutura.
- **AWS S3**: Armazenamento do site estático.
- **AWS CloudFront**: CDN para entrega de conteúdo com HTTPS.
- **AWS Route 53**: Gerenciamento de DNS.
- **AWS ACM**: Certificados SSL/TLS.
- **GitHub Actions**: CI/CD para deploy automático.

## 🌐 URL do Site

Acesse em: [https://livros.andresantos.click](https://livros.andresantos.click)

## 🧱 Arquitetura da Infraestrutura

```
Usuário → CloudFront (HTTPS)
                   ↓
               S3 Bucket
                   ↓
         Route 53 + ACM (SSL)
```

- CloudFront é responsável por servir o conteúdo via HTTPS.
- ACM fornece o certificado SSL.
- S3 armazena os arquivos do site (`index.html`, `error.html`, etc).
- Route 53 gerencia os registros DNS para o domínio/subdomínio.

## 📂 Estrutura do Projeto

```
.
├── modules/
│   ├── acm/
│   ├── cloudfront/
│   └── s3/
├── site/
│   ├── index.html
│   └── error.html
├── .github/
│   └── workflows/
│       └── deploy.yml
├── terraform.tfvars
├── variables.tf
├── outputs.tf
├── main.tf
└── README.md
```

## ⚙️ Deploy Automático com GitHub Actions

Toda vez que mudanças são feitas na pasta `site/`, o GitHub Actions faz automaticamente o deploy para o bucket S3.

### 🔐 Secrets Necessários

Configure no repositório:

- `AWS_ACCESS_KEY_ID`
- `AWS_SECRET_ACCESS_KEY`

### 📝 Workflow: `.github/workflows/deploy.yml`

```yaml
name: Deploy Livro Site para S3

on:
  push:
    paths:
      - 'site/**'
      - '.github/workflows/deploy.yml'

jobs:
  deploy:
    runs-on: ubuntu-latest

    steps:
      - name: Checkout do código
        uses: actions/checkout@v3

      - name: Instalar AWS CLI (caso necessário)
        run: |
          if ! aws --version; then
            curl "https://awscli.amazonaws.com/awscli-exe-linux-x86_64.zip" -o "awscliv2.zip"
            unzip awscliv2.zip
            sudo ./aws/install --update
          fi

      - name: Deploy para o S3
        env:
          AWS_ACCESS_KEY_ID: ${{ secrets.AWS_ACCESS_KEY_ID }}
          AWS_SECRET_ACCESS_KEY: ${{ secrets.AWS_SECRET_ACCESS_KEY }}
          AWS_REGION: sa-east-1
        run: |
          aws s3 sync site/ s3://livros.andresantos.click --delete
```

## 📦 Como Subir a Infraestrutura

```bash
terraform init
terraform validate
terraform plan
terraform apply
```

## ✅ Recursos Criados

- Bucket S3: `livros.andresantos.click`
- Distribuição CloudFront com HTTPS
- Certificado ACM validado via DNS
- Registros A no Route 53 (sem www)
- Deploy contínuo via GitHub Actions

## 👨‍💻 Autor

**André Santos**  
[Siga no LinkedIn](https://www.linkedin.com/in/andre-fernandes-santos-/)

---

**Repositório com fins educacionais.**
