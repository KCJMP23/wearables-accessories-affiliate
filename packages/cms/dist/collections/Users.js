export const Users = {
    slug: 'users',
    auth: {
        verify: {
            generateEmailHTML: ({ token, user }) => {
                return `
          <h1>Verify your email</h1>
          <p>Please click the link below to verify your email:</p>
          <a href="${process.env.PAYLOAD_PUBLIC_SERVER_URL}/verify-email?token=${token}">
            Verify Email
          </a>
        `;
            },
        },
    },
    admin: {
        useAsTitle: 'email',
    },
    access: {
        read: () => true,
    },
    fields: [
        {
            name: 'name',
            type: 'text',
            required: true,
        },
        {
            name: 'role',
            type: 'select',
            required: true,
            defaultValue: 'editor',
            options: [
                {
                    label: 'Admin',
                    value: 'admin',
                },
                {
                    label: 'Editor',
                    value: 'editor',
                },
                {
                    label: 'Author',
                    value: 'author',
                },
            ],
        },
        {
            name: 'avatar',
            type: 'upload',
            relationTo: 'media',
        },
    ],
};
