# Tools

The `tools` folder in the root of the project contains a set of project-focused scripts to interact with XM 
Cloud without the need to have personal access to the XM Cloud Deploy UI.

The reasoning behind this is that you need to be an organization admin to be able to access 
the XM Cloud Deploy UI on https://deploy.sitecorecloud.io/, and if you have access you can
do actions on all projects and all environments. Not all users will be granted this access.

In the mean time developers in the project must be able to do things like deploying code to a
specific environment, get the deployment log files for a deployment, and do item serialization.

With the set of provided scripts you can do exactly that:

- `xmcloud-org-login.ps1` - do a login for the Sitecore CLI with organization administration credentials
- `xmcloud-buildanddeploy.ps1` - create a new deployment on an XM Cloud environment with your local files (downloads log files as well)
- `xmcloud-buildanddeploy-getlogs.ps1` - download the log files of a specific deployment
- `xmcloud-serialization-pull.ps1` - pull serialization items from and XM Cloud environment
- `xmcloud-serialization-push.ps1` - push serialization items to an XM Cloud environment
- `xmcloud-getinfo.ps1` - get info over all projects and environments in an organization

All scripts do automatically login based on the credentials provided in the `xmcloud-config.json` configuration file.

All scripts require the name of an environment, except the `xmcloud-getinfo.ps1` script.
The name of the environments are configured in the `xmcloud-config.json` configuration file.

# The XM Cloud configuration file

To support the XM Cloud related scripts, the scripts use a custom configuration file `xmcloud-config.json` 
with information on the XM Cloud environment. This configuration file should be in the following format:

```json
{
    "XMCloud_Environments": {
        "devserge": {
            "id": "<ENVIRONMENT ID>",
            "cm": "https://<ENVIRONMENT URL>.sitecorecloud.io"
        }
    },
    "==== Organization Authentication Client Id and Secret ====": "See: https://deploy.sitecorecloud.io/auth-clients/organization",
    "XMCloud_AutomationClient_ClientId": "<ORGANIZATION LEVEL CLIENT ID>",
    "XMCloud_AutomationClient_ClientSecret": "<ORGANIZATION LEVEL CLIENT SECRET>"
}
```