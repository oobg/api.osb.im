import { HttpStatus } from "@nestjs/common";

interface HttpResponse<T> {
	status: HttpStatus;
	message?: T;
	error?: string;
}

const httpHandler = async <T>(operation: () => Promise<T>): Promise<HttpResponse<T>> => {
	try {
		const message = await operation();
		return {
			status: HttpStatus.OK,
			message: message,
		};
	} catch (error) {
		return {
			status: HttpStatus.INTERNAL_SERVER_ERROR,
			error: error.message,
		};
	}
};

export default httpHandler;