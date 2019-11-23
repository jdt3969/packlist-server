# Server Builder

An app to generate a server with minimal config

## Deployment

### Initialize

#### Create JWT Secret

(This is done once per environment)

```bash
# Generate Private/Public Key
ssh-keygen \
  -t rsa \
  -b 2048 \
  -m PEM \
  -f /tmp/jwtRS256.key

openssl rsa \
  -in /tmp/jwtRS256.key \
  -pubout \
  -outform PEM \
  -out /tmp/jwtRS256.key.pub

# Create K8s Secret
kubectl create secret generic json-web-token-pem \
  -n packlist-dev \
  --from-file=/tmp/jwtRS256.key \
  --from-file=/tmp/jwtRS256.key.pub

# Remove Private/Public Key
rm /tmp/jwtRS256.*
```

## Development
