# XM Cloud Starter Kit (Next JS)

## QUICK START

1. In an ADMIN terminal:

    ```ps1
    .\init.ps1 -InitEnv -LicenseXmlPath "C:\path\to\license.xml" -AdminPassword "DesiredAdminPassword"
    ```

2. Restart your terminal and run:

    ```ps1
    .\up.ps1
    ```

3. Follow the instructions to [deploy to XM Cloud](#deploy-to-xmcloud)

4. Create Edge token and [query from edge](#query-edge)

***

## About this Solution
This solution is designed to help developers learn and get started quickly
with XMCLoud + SXA.

## Getting started - VGZ

Read: <https://www.sergevandenoever.nl/XM_Cloud_rendering_host_options_and_fast_local_development/>

1. Copy `` /src/sxastarter/.env.local.template `` to `` /src/sxastarter/.env.local ``
1. /src/sxastarter> `` npm install ``
1. /src/sxastarter> `` lt --port 3000 --subdomain vgz-demo-{YourName} ``. Leave the comannd running and open a new console window. your reverse proxy url will look something like this: `` https://vgz-demo-arno.loca.lt ``
1. /src/sxastarter> `` npm run start:connected ``. Leave the comannd running.
