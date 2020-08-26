#!/usr/bin/env bash

transform_recursively() {
  for i in "$1"/*; do
    if [ -d "$i" ]; then
      transform_recursively "$i"
    elif [ -f "$i" ] && [[ "$i" == *.gltf ]]; then
      echo "Transforming $i"
      gltf-pipeline -i "$i" -o "$i" -d
    fi
  done
}

transform_recursively public
