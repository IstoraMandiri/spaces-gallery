#!/usr/bin/env bash

NAME=$1
FILE=$2

STAGED_FOLDER="public/staging/${NAME}"
STAGED_FILE="${STAGED_FOLDER}/${FILE}.gltf"
DESTINATION_FILE="src/models/${FILE}.tsx"

gltf-pipeline -i "${STAGED_FILE}" -o "${STAGED_FILE}" -d
gltfjsx "${STAGED_FILE}" "${DESTINATION_FILE}" --draco --precision 6 --types

aws s3 cp "${STAGED_FOLDER}" "s3://spaces-gallery-assets/models/${NAME}" --recursive

rm -r "${STAGED_FOLDER}"

echo -e "\nDON'T FORGET TO CHANGE THE LINK INSIDE THE COMPONENT"
echo -e "COMPONENT LOCATION: src/models/${FILE}.tsx"
echo -e "CHANGE '/${FILE}.gltf' to 'https://d27rt3a60hh1lx.cloudfront.net/models/${NAME}/${FILE}.gltf'\n"
