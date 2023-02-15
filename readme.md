# Confluence-to-Outline Migration Tool
This is a software tool that can migrate Markdown content from Atlassian Confluence to Outline. It is useful for those who wish to switch their knowledge management system from Confluence to Outline.

## Features
Converts Confluence pages to Outline Markdown format
Supports conversion of rich text, images, and attachments
Retains page hierarchy and structure
Handles nested pages and tables
Migrates metadata such as page labels and comments

## Getting Started
To get started, clone the repository to your local machine:

```
git clone https://github.com/your-username/confluence-to-outline.git
```

Next, install the required dependencies:

```
yarn
```

Once the dependencies have been installed, create a .env file in the root directory of the project with the following environment variables:

`CONFLUENCE_URL`: The base URL of your Confluence instance
`CONFLUENCE_EMAIL`: Your Confluence Admin Email
`CONFLUENCE_PASSWORD`: Your Confluence Password
`OUTLINE_API_KEY`: Your Outline API key
You can obtain your Outline API key by going to your Outline settings and generating a new API key.

Once you have set up your environment variables, you can run the migration tool by running the following command:

```
yarn start
```

This will start the migration process, which may take some time depending on the size of your Confluence content.

## Contributing
Contributions to this tool are welcome! If you find any issues or have suggestions for improvements, please feel free to create an issue or submit a pull request.

## License
This tool is licensed under the MIT License.