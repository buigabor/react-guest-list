export interface IEvent {
	eventName: string;
	eventLocation: string;
	eventId: number;
}

export interface Guest {
	id: number;
	firstName: string;
	lastName: string;
	attending: boolean;
}
