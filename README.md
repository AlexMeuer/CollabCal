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
