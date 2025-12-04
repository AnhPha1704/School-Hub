// import { auth } from "@clerk/nextjs/server";

// const { userId, sessionClaims } = auth();
// export const role = (sessionClaims?.metadata as { role?: string })?.role;
// export const currentUserId = userId;

import { auth } from "@clerk/nextjs/server";

export const getAuthData = async () => {
	const { userId, sessionClaims } = await auth();
	return {
		role: (sessionClaims?.metadata as { role?: string })?.role,
		currentUserId: userId,
	};
};
