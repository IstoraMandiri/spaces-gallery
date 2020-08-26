# Spaces Gallery

## Getting Started

After you clone the repo, run yarn to add the necessary packages.

```bash
yarn
```

Make sure you have Next.js installed as well if you have not used it before:

```bash
yarn global add next
```

To run the development server:

```bash
yarn dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

You can start editing the page by modifying `pages/index.js`. The page auto-updates as you edit the file.

## GLTF Pipeline

We have created a bash script to pipeline GLTF files and assets from local to AWS S3 and programmatically create model components for each GLTF.

**Important:** The first time you run the pipeline you need to initialize your AWS S3 credentials for AWGE's AWS by running this command:

```bash
yarn init-pipeline
```

To add an exported GLTF to the project:

1. Download and unzip the archive from Google Drive into `~/path/to/directory/spaces-gallery/public/staging/`.
2. Change the name of the folder. It is recommended to use something descriptive and also unique to prevent caching. It also cannot have spaces. For example, if the folder was originally named `AWGE Bodega Exterior` it should be changed to something along the lines of `AwgeBodegaExteriorPC001` where PC is my initials and 001 is a running tally of how many times I have pipelined a GLTF of the bodega exterior.
3. Confirm the GLTF file inside this folder does not have spaces in the name. If it does, rename the file and remove the spaces.
4. **Warning:** the following step removes the folder you added to `staging` so it is recommended to make a copy of the zip file before running.
5. Run the bash script from project root:

```bash
yarn pipeline NameOfFolder NameOfGLTF
```

6. If you read the the output from the pipeline script you will notice it provides instructions to modify the Typescript file the script created to change a URL as shown here:

```bash
COMPONENT LOCATION: components/models/AwgeBodegaExterior.tsx
CHANGE '/AwgeBodegaExterior.gltf' to 'https://dwvo2npct47gg.cloudfront.net/models/awge-space/AwgeBodegaExteriorPC001/AwgeBodegaExterior.gltf'
```

7. Navigate to the component location given and look for this.

```
  const { nodes, materials } = useLoader<GLTFResult>(
    GLTFLoader,
    "/AwgeBodegaExterior.gltf",
    loadModel(setLoading)
  );
```

8. It should be changed to:

```
  const { nodes, materials } = useLoader<GLTFResult>(
    GLTFLoader,
    "https://dwvo2npct47gg.cloudfront.net/models/awge-space/AwgeBodegaExteriorPC001/AwgeBodegaExterior.gltf",
    loadModel(setLoading)
  );
```

9. After this, you should be all to load your model! Make sure to change the scaling if necessary.
