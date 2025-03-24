# CodeMytrix - AI Powered Code Generator

**CodeMytrix** is an AI-powered tool designed to help developers quickly generate code based on simple input. With a user-friendly interface and efficient code generation capabilities, it aims to save time and increase productivity for programmers of all skill levels.

## Built With

- **Vite** - A fast build tool and development server.
- **TypeScript** - A strongly typed programming language that builds on JavaScript.
- **React** - A JavaScript library for building user interfaces.
- **ShadCN-UI** - A collection of accessible and customizable UI components for React.
- **Tailwind CSS** - A utility-first CSS framework for styling.

## Features

- **AI-based Code Generation**: Generate code snippets from natural language input.
- **Support for Multiple Programming Languages**: Get code in a variety of programming languages.
- **Responsive UI**: Designed to work seamlessly across devices.
- **Customizable UI**: Built with **Tailwind CSS** and **ShadCN-UI** components for a sleek and flexible design.

## Installation

To run CodeMytrix locally, follow these steps:

### Prerequisites

Make sure you have **Node.js** installed on your machine. You can download it from [here](https://nodejs.org/).

### Steps

1. **Clone the repository**:
   ```bash
   git clone https://github.com/Owais573/codemytrix.git
   ```
2. **Navigate into the project directory**:
   ```bash
   cd codemytrix
   ```
3. **Install dependencies**:
   ```bash
   npm install
   ```
4. **Run the development server**:
   ```bash
   npm run dev
   ```
5. Open your browser and go to `http://localhost:3000` to see the app in action.

## API Key Setup

CodeMytrix utilizes the **Together API** for AI-powered code generation. You need to provide an API key to access the model **"meta-llama/Llama-3.3-70B-Instruct-Turbo-Free"**.

### Steps to Set API Key:

1. Obtain your FREE API key from [Together AI](https://api.together.xyz).
2. Open the file `CodeGenerator.tsx` located at:
   ```
   codemytrix/src/components/CodeGenerator.tsx
   ```
3. Locate the section in the file where the API key is defined:
   ```typescript
   const TOGETHER_API_KEY = "Enter_Your_Together_API_KEY";
   ```
4. Replace `"Enter_Your_Together_API_KEY"` with your actual API key.
5. Save the file and restart the development server if needed.

## Usage

1. **Enter a task**: Type a description of the code you need help with (e.g., "Create a function to calculate the sum of an array").
2. **Generate Code**: Click the "Generate Code" button and get the AI-generated code snippet.
3. **Select Language**: You can choose the programming language for the generated code (e.g., JavaScript, Python, etc.).

## Contributing

We welcome contributions to CodeMytrix! To contribute, follow these steps:

1. **Fork the repository on GitHub**.
2. **Clone your fork to your local machine**:
   ```bash
   git clone https://github.com/Owais573/codemytrix.git
   ```
3. **Create a new branch**:
   ```bash
   git checkout -b feature-branch
   ```
4. **Make your changes and commit them**:
   ```bash
   git commit -am 'Add new feature'
   ```
5. **Push your changes to your fork**:
   ```bash
   git push origin feature-branch
   ```
6. **Create a pull request** from your fork to the original repository.

## Code of Conduct

By participating, you agree to adhere to the project's Code of Conduct.

## License

This project is licensed under the MIT License - see the LICENSE file for details.

## Acknowledgements

Thanks to the open-source community for the great libraries and tools that helped build this project.

Special thanks to **ShadCN-UI** and **Tailwind CSS** for providing accessible and customizable UI components.

Inspired by various AI tools and code generators.
