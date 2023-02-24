# Display fields of Sitecore item
# https://www.sergevandenoever.nl
param(
    [Parameter(Mandatory=$true)][string]$environment,
    [string]$itemPath = "/sitecore/content/Home"
)

$spe = . "$PSScriptRoot\xmcloud-get-spe.ps1" -environment $environment

Write-Output "Username: $($spe.spe_username)"
Write-Output "Password: $($spe.spe_password)"
Write-Output "Server  : $($spe.cm)"

Write-Output "Get item fields of '$itemPath'..."
Import-Module -Name SPE 
$session = New-ScriptSession -Username $spe.spe_username -Password $spe.spe_password -ConnectionUri $spe.cm
Invoke-RemoteScript -Session $session -ScriptBlock {
    Get-Item $Using:itemPath | Get-ItemField -IncludeStandardFields -ReturnType Field -Name "*" | Format-Table Name, DisplayName, SectionDisplayName, Description -auto
}
Stop-ScriptSession -Session $session

