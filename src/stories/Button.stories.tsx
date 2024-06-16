import type { Meta, StoryObj } from '@storybook/react';

import Button from '../components/Button/Button';
const meta = {
    tags: ['autodocs'],
    component: Button,
    argTypes: {
        variation: {
            options: [
                'button-1',
                'button-2',
                'button-3',
                'button-4',
                'button-5',
                'button-6',
            ],
            control: { type: 'radio' },
        },
    },
    parameters: {
        // More on how to position stories at: https://storybook.js.org/docs/react/configure/story-layout
        layout: 'fullscreen',
    },
} satisfies Meta<typeof Button>;

export default meta;

type Story = StoryObj<typeof meta>;

export const Buttons: Story = {
    args: {
        text: 'New Invoice',
        variation: 'button-1',
    },
};
