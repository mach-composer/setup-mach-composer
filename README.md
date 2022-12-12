# GitHub action for installing MACH composer


Example:

```yaml
env:
  TF_PLUGIN_CACHE_DIR: ${{ github.workspace }}/.terraform.d/plugin-cache
  
jobs:
  deploy:
    runs-on: ubuntu-latest
    steps:
      - name: Install terraform
        uses: hashicorp/setup-terraform@v2
        with:
          terraform_version: 1.3.5

      - name: Create Terraform Plugins Cache Dir
        run: mkdir --parents $TF_PLUGIN_CACHE_DIR

      - name: Cache Terraform Plugins
        uses: actions/cache@v2
        with:
          path: ${{ env.TF_PLUGIN_CACHE_DIR }}
          key: ${{ runner.os }}-terraform-${{ hashFiles('**/.terraform.lock.hcl') }}

      - name: Install MACH composer
        uses: mach-composer/setup-mach-composer@main
        with:
          version: 2.4.6

      - name: MACH composer plan
        run: mach-composer plan

      - name: MACH composer apply
        run: mach-composer apply --auto-approve --reuse
        if: github.ref == 'refs/heads/main'
```
