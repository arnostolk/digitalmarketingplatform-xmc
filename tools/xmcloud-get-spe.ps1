# Get the SPE credentials for the given XM Cloud environment from the xmcloud-config.json
# configuration file.
#
# Author: Serge van den Oever [Macaw]
# Version: 1.0
param (
    [Parameter(Mandatory=$true)][string]$environment
)

$VerbosePreference = 'SilentlyContinue' # change to Continue to see verbose output
$DebugPreference = 'SilentlyContinue' # change to Continue to see debug output
$ErrorActionPreference = 'Stop'

if (-not (Test-Path -Path $PSScriptRoot\xmcloud-config.json)) {
    Write-Error "File .\tools\xmcloud-config.json does not exist"
}
$xmcloudConfig = Get-Content -Raw -Path $PSScriptRoot\xmcloud-config.json | ConvertFrom-Json

if (-not ($xmcloudConfig.XMCloud_Environments -and $xmcloudConfig.XMCloud_Environments.$environment)) {
    Write-Error "Environment '$environment' not found in file .\tools\xmcloud-config.json. See .\tools\xmcloud-config.md for an example of the required format."
}

$environmentInfo = $xmcloudConfig.XMCloud_Environments.$environment
if (-not ($environmentInfo.cm -and $environmentInfo.spe_username -and $environmentInfo.spe_password)) {
    Write-Error "Environment '$environment' missing field 'cm', or 'spe_username', or 'spe_password' in file .\tools\xmcloud-config.json. See .\tools\xmcloud-config.md for an example of the required format."
}

@{
    cm = $environmentInfo.cm
    spe_username = $environmentInfo.spe_username
    spe_password = $environmentInfo.spe_password
}