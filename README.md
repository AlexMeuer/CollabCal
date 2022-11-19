![GitHub Workflow Status](https://img.shields.io/github/workflow/status/alexmeuer/CollabCal/Deploy%20to%20Firebase%20Hosting%20on%20merge)
![Libraries.io dependency status for GitHub repo](https://img.shields.io/librariesio/github/AlexMeuer/CollabCal)

# Quickstart

Prerequisites:

- `nvm`
- `pnpm` (not `npm`, not `yarn`)

From the root directory:

- `nvm use` - You might have to install the required node version (`nvm install`).
- `pnpm i` - Install all dependencies.
- (Optional) Alias `pnpm nx` to `pnx`
  - Bash: `alias pnx="pnpm nx run"` (save this to _.bashrc_ or wherever you normally persist stuff like this).
  - Fish: `abbr pnx pnpm nx run`
- `pnx collabcal:dev` - Run the calendar app
