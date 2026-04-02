/**
 * Bored MCP — wraps Bored API (free, no auth)
 *
 * Tools:
 * - random_activity: Get a random activity suggestion
 * - activity_by_type: Get a random activity of a specific type
 * - activity_by_participants: Get a random activity for a specific number of participants
 */

interface McpToolDefinition {
  name: string;
  description: string;
  inputSchema: {
    type: 'object';
    properties: Record<string, unknown>;
    required?: string[];
  };
}

interface McpToolExport {
  tools: McpToolDefinition[];
  callTool: (name: string, args: Record<string, unknown>) => Promise<unknown>;
}

const BASE_URL = 'https://bored-api.appbrewery.com/api';

type BoredActivity = {
  activity: string;
  type: string;
  participants: number;
  price: number;
  accessibility: number;
  duration?: string;
  kidFriendly?: boolean;
  link?: string;
  key?: string;
};

function formatActivity(data: BoredActivity) {
  return {
    activity: data.activity,
    type: data.type,
    participants: data.participants,
    price: data.price,
    accessibility: data.accessibility,
    duration: data.duration ?? null,
    kid_friendly: data.kidFriendly ?? null,
    link: data.link ?? null,
    key: data.key ?? null,
  };
}

const ACTIVITY_TYPES = ['education', 'recreational', 'social', 'diy', 'charity', 'cooking', 'relaxation', 'music', 'busywork'] as const;
type ActivityType = typeof ACTIVITY_TYPES[number];

const tools: McpToolExport['tools'] = [
  {
    name: 'random_activity',
    description: 'Get a random activity suggestion to cure boredom.',
    inputSchema: {
      type: 'object',
      properties: {},
    },
  },
  {
    name: 'activity_by_type',
    description: 'Get a random activity suggestion filtered by category type.',
    inputSchema: {
      type: 'object',
      properties: {
        type: {
          type: 'string',
          description:
            'Activity category. One of: education, recreational, social, diy, charity, cooking, relaxation, music, busywork',
          enum: ['education', 'recreational', 'social', 'diy', 'charity', 'cooking', 'relaxation', 'music', 'busywork'],
        },
      },
      required: ['type'],
    },
  },
  {
    name: 'activity_by_participants',
    description: 'Get a random activity suggestion for a specific number of participants.',
    inputSchema: {
      type: 'object',
      properties: {
        participants: {
          type: 'number',
          description: 'Number of participants (e.g., 1 for solo, 2 for pairs, 4 for groups)',
        },
      },
      required: ['participants'],
    },
  },
];

async function callTool(name: string, args: Record<string, unknown>): Promise<unknown> {
  switch (name) {
    case 'random_activity':
      return randomActivity();
    case 'activity_by_type':
      return activityByType(args.type as ActivityType);
    case 'activity_by_participants':
      return activityByParticipants(args.participants as number);
    default:
      throw new Error(`Unknown tool: ${name}`);
  }
}

async function randomActivity() {
  const res = await fetch(`${BASE_URL}/activity`);
  if (!res.ok) throw new Error(`Bored API error: ${res.status}`);

  const data = (await res.json()) as BoredActivity;
  return formatActivity(data);
}

async function activityByType(type: ActivityType) {
  const res = await fetch(`${BASE_URL}/activity?type=${encodeURIComponent(type)}`);
  if (!res.ok) throw new Error(`Bored API error: ${res.status}`);

  const data = (await res.json()) as BoredActivity;
  return formatActivity(data);
}

async function activityByParticipants(participants: number) {
  const res = await fetch(`${BASE_URL}/activity?participants=${participants}`);
  if (!res.ok) throw new Error(`Bored API error: ${res.status}`);

  const data = (await res.json()) as BoredActivity;
  return formatActivity(data);
}

export default { tools, callTool } satisfies McpToolExport;
