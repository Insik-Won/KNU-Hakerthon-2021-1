import multer from "multer";
import multerS3 from "multer-s3";
import AWS from "aws-sdk";
import { AWS_KEY_ID, AWS_PRIVATE_KEY, BUCKET_NAME, REGION } from "../config";

const s3 = new AWS.S3({
	accessKeyId: AWS_KEY_ID,
	secretAccessKey: AWS_PRIVATE_KEY,
	region: REGION,
});

const storage = multerS3({
	s3: s3,
	bucket: BUCKET_NAME,
	contentType: multerS3.AUTO_CONTENT_TYPE,
	acl: "public-read",
	metadata: function (req, file, cb) {
		cb(null, { fieldName: file.fieldname });
	},
	key: function (req, file, cb) {
		cb(null, `partyUserImages/${Date.now()}_${file.originalname}`);
	},
});

const createUpload = (path) => {
	const storage = multerS3({
		s3: s3,
		bucket: BUCKET_NAME,
		contentType: multerS3.AUTO_CONTENT_TYPE,
		acl: "public-read",
		metadata: function (req, file, cb) {
			cb(null, { fieldName: file.fieldname });
		},
		key: function (req, file, cb) {
			cb(null, `${path}/${Date.now()}_${file.originalname}`);
		},
	});

	return multer({ storage: storage });
};

export default createUpload;
