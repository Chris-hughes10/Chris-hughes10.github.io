--[[
  source-button.lua

  Replaces a `::: {.source-button} :::` marker in a post with a button that
  exposes the post's raw Quarto markdown source. The source is read at render
  time and embedded into the page (HTML-escaped, so any markup inside the source
  cannot break out of the container). The accompanying source-modal.js wires the
  button up to a modal with copy / download actions.

  Opt-in per post: add the marker below wherever you want the button to appear.

      ::: {.source-button}
      :::

  An optional custom label can be supplied:

      ::: {.source-button label="View source"}
      :::
]]

local function html_escape(s)
  return (s:gsub("[&<>]", { ["&"] = "&amp;", ["<"] = "&lt;", [">"] = "&gt;" }))
end

local function read_source()
  local path
  if quarto and quarto.doc and quarto.doc.input_file then
    path = quarto.doc.input_file
  elseif PANDOC_STATE and PANDOC_STATE.input_files and #PANDOC_STATE.input_files > 0 then
    path = PANDOC_STATE.input_files[1]
  end
  if not path then return nil end

  local fh = io.open(path, "rb")
  if not fh then return nil end
  local content = fh:read("*a")
  fh:close()
  return content
end

function Div(el)
  if not el.classes:includes("source-button") then
    return nil
  end

  -- Only render the button for HTML output that can run JavaScript; drop the
  -- marker entirely for any other format.
  if not quarto.doc.is_format("html:js") then
    return {}
  end

  local md = read_source()
  if not md then
    return {}
  end

  local label = el.attributes["label"] or "View Markdown"

  local html = table.concat({
    '<div class="source-button-wrapper">',
    '<button class="source-md-button" type="button" aria-label="View raw markdown source">',
    '<span class="source-md-button-icon" aria-hidden="true">&#128196;</span> ',
    html_escape(label),
    '</button>',
    '<div class="source-md-content" hidden>',
    html_escape(md),
    '</div>',
    '</div>'
  })

  return pandoc.RawBlock("html", html)
end
