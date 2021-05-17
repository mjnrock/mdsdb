import { v4 as uuidv4 } from "uuid";
import Agency from "@lespantsfancy/agency";

export const EnumMessageType = {
	SAVE_FORM: "SAVE_FORM",
};

export const DictionaryNetwork = () => new Agency.Event.Network({
	id: uuidv4(),
	data: {},
	entries: {},
}, {
	default: {
		[ EnumMessageType.SAVE_FORM ]: (msg, { mergeState }) => {
			mergeState({});
		},
	},
});

export default DictionaryNetwork;