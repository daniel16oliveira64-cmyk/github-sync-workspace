<!-- LOVABLE:BEGIN -->
> [!IMPORTANT]
> This project is connected to [Lovable](https://lovable.dev). Avoid rewriting
> published git history — force pushing, or rebasing/amending/squashing commits
> that are already pushed — as it rewrites history on Lovable's side and the
> user will likely lose their project history.
>
> Commits you push to the connected branch sync back to Lovable and show up in
> the editor, so keep the branch in a working state.
<!-- LOVABLE:END -->

## Original Kroma workspace
- Keep the imported standalone application under `kroma-v1.9/`; its existing Node server and plain browser scripts remain independent of the TanStack starter so local execution is preserved.
- The Studio controls mount before the existing site engine; keep generated-site rendering in that engine so preview and HTML export use the same output.
