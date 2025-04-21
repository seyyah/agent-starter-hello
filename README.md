# Number Range Agent

A simple OpenServ agent that returns a string of numbers between two given numbers, separated by commas.

## Features

- Takes two numbers as input (start and end)
- Returns a comma-separated string of all numbers in that range (inclusive)
- Handles validation to ensure start is less than or equal to end

## Getting Started

### Prerequisites

- Node.js (v14 or higher)
- npm or yarn
- An OpenServ account (for deployment)
- (Optional) An OpenAI API key for local testing

### Installation

1. Clone this repository
2. Install dependencies:

```bash
npm install
```

3. Copy the example environment file and update it with your credentials:

```bash
cp .env.example .env
```

Edit the `.env` file to add:
- `OPENSERV_API_KEY`: Your OpenServ API key (required for platform integration)
- `OPENAI_API_KEY`: Your OpenAI API key (optional, for local testing)
- `PORT`: The port for your agent's server (default: 7378)

### Running Locally

To start the development server with hot reloading:

```bash
npm run dev
```

To build and run the production version:

```bash
npm run build
npm start
```

## Testing

The agent includes a `main()` function that demonstrates how to test it locally using the `process()` method. This will run automatically when you start the agent.

## Deployment

To deploy to the OpenServ platform:

1. Start your local server
2. Expose your server with a tunneling tool like ngrok
3. Register your agent on the OpenServ platform
4. Set the Agent Endpoint to your tunneling tool URL

## License

MIT
