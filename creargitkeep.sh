#!/bin/bash

base_dir="backend/${1:-.}"

find "$base_dir" -type d ! -exec sh -c 'ls -A "$1" | grep -q .' _ {} \; -print | while read -r dir; do
  gitkeep_path="$dir/.gitkeep"
  if [ ! -f "$gitkeep_path" ]; then
    touch "$gitkeep_path"
    echo "Creado $gitkeep_path"
  fi
done
echo "Listo"
