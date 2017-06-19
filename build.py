import subprocess

output_file = 'index.html'
output = ''

def write(output):
    with open(output_file, 'r+') as f:
        f.truncate()
        f.write(output)

# autoprefix css
autoprefix_cmd = 'postcss src/style.css --use autoprefixer --dir build/'
subprocess.run(autoprefix_cmd.split(), stdout=subprocess.PIPE).stdout.decode('utf-8')
# autoprefixer prints confirmation/timing

# compile ts
compile_cmd = 'tsc src/tab.ts --outFile build/tab.js'
subprocess.run(compile_cmd.split(), stdout=subprocess.PIPE).stdout.decode('utf-8')
print('✔ Compiled src/tab.ts')

# combine
html, css, js = '', '', ''

with open('src/page.html', 'r') as f:
    html += f.read()

with open('build/style.css', 'r') as f:
    css += f.read()

with open('build/tab.js', 'r') as f:
    js += f.read()

output += html
output += '<script>' + js + '</script>'
output += '<style>' + css + '</style>'
write(output)
print('✔ Wrote index.html')

# minify
minify_command = 'html-minifier --collapse-boolean-attributes --collapse-whitespace --decode-entities --html5 --minify-css --minify-js --process-conditional-comments --remove-attribute-quotes --remove-comments --remove-empty-attributes --remove-optional-tags --remove-redundant-attributes --remove-script-type-attributes --remove-style-link-type-attributes --remove-tag-whitespace --sort-attributes --sort-class-name --trim-custom-fragments --use-short-doctype ' + output_file
mini_output = subprocess.run(minify_command.split(), stdout=subprocess.PIPE).stdout.decode('utf-8')
write(mini_output)
print('✔ Minified index.html')
