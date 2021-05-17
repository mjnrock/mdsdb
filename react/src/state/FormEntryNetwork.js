import { v4 as uuidv4 } from "uuid";
import Agency from "@lespantsfancy/agency";

export const EnumMessageType = {
	SAVE_FORM: "SAVE_FORM",

	FORM_DATA: "FORM_DATA",
	RESPOND: "RESPOND",
};

export const FormEntryNetwork = () => new Agency.Event.Network({
	id: uuidv4(),
	data: {},
	entries: {},
}, {
	default: {
		[ EnumMessageType.FORM_DATA ]: ({ data }, { mergeState }) => {
			const [ formData ] = data;

			mergeState({
				data: formData,
			});
		},
		[ EnumMessageType.RESPOND ]: ({ data }, { mergeState }) => {
			const [ responses ] = data;
			let entries = Object.entries(responses || {}).reduce((a, [ k, v ]) => {
				if(typeof v === "string" || v instanceof String) {
					if(v.length) {
						return {
							...a,
							[ k ]: v,
						};
					}

					return a;
				}

				return {
					...a,
					[ k ]: v,
				};
			}, {});

			if(entries) {
				mergeState({
					responses: entries,
				});
			}
		},
		[ EnumMessageType.SAVE_FORM ]: ({ data }, { getState }) => {
			const [ formData ] = data;

			try {
				const results = JSON.stringify(formData);
	
				fetch("http://localhost:3001/form/entry/upsert", {
					method: "POST",
					headers: {
						"Accept": "application/json",
						"Content-Type": "application/json",
					},
					body: results,
				});
			} catch(e) {
				console.error(e)
			}
		},
	},
});

export default FormEntryNetwork;