#!/bin/bash

awk_pad_nl='
FNR == 1 && NR != 1 {
	print "";
}
1'
js_main_head="\
$(cat LICENSE.head)

(function() {"
js_main_tail="})();"
typings_json_head="\
{
  \"name\": \""
typings_json_tail="\
\",
  \"homepage\": \"https://github.com/nabijaczleweli/ts-polyfill\",
  \"ambient\": true,
  \"files\": [
    \"index.d.ts\"
  ]
}"

polyfills=$(echo ./*/ | sed -e 's:\./::g' -e 's:/::g')
if [[ -z "$OUT" ]]; then
	OUT="../polyfills"
fi

for polyfill in $polyfills; do
	echo "Building JS for $polyfill..."
  mkdir -p "$OUT/$polyfill"
  class=$(shyaml get-value class < "$polyfill/js.yml")
  name=$(shyaml get-value name < "$polyfill/js.yml")
  (
  	echo    "  if (!$class.prototype.$name) {"
  	echo    "    // https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/$class/$name#Polyfill"
  	echo -n "    $class.prototype.$name = "; sed '2,$s/^/    /g' "$polyfill/polyfill.js"
  	echo    "  }"
  ) > "$OUT/$polyfill/raw.js"

	(
		echo "$js_main_head"
		cat "$OUT/$polyfill/raw.js"
		echo "$js_main_tail"
	) > "$OUT/$polyfill/index.js"
done


echo "Building JS almaganation..."
(
	echo "$js_main_head"
	find "$OUT" -name "raw.js" -exec awk "$awk_pad_nl" {} + -exec rm {} +
	echo "$js_main_tail"
) > "$OUT/index.js"


for polyfill in $polyfills; do
	echo "Building TS typings for $polyfill..."
  name=$(shyaml get-value name < "$polyfill/ts.yml")
  class=$(shyaml get-value class < "$polyfill/ts.yml")
  (
  	echo    "interface $class {"
  	echo -n "  /** "; head -n1 "$polyfill/ts.doc"
  	tail -n+2 "$polyfill/ts.doc" | sed 's/^/    \* /g'
  	echo    "    */"
  	echo -n "  "; cat "$polyfill/signature.d.ts"
  	echo    "}"
  ) > "$OUT/$polyfill/raw.d.ts"

	(
		cat LICENSE.head
		echo
		cat "$OUT/$polyfill/raw.d.ts"
	) > "$OUT/$polyfill/index.d.ts"

	(
		echo -n "$typings_json_head"
		echo -n "$name"
		echo    "$typings_json_tail"
	) > "$OUT/$polyfill/typings.json"
done

echo "Building TS typings almaganation..."
(
	cat LICENSE.head
	echo
	find "$OUT" -name "raw.d.ts" -exec awk "$awk_pad_nl" {} + -exec rm {} +
) > "$OUT/index.d.ts"

(
	echo -n "$typings_json_head"
	echo -n "ts-polyfills"
	echo    "$typings_json_tail"
) > "$OUT/typings.json"
