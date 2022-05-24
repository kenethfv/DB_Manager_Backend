const AWS = require('aws-sdk')
const moment = require('moment-timezone')

const s3 = new AWS.S3({
  region: process.env.AWS_AUTH_REGION,
  accessKeyId: process.env.AWS_AUTH_ACCESS_KEY,
  secretAccessKey: process.env.AWS_AUTH_SECRET_ACCESS_KEY,
})

const uploadToS3 = async (slug, csv) => {
  try {
    const fileName = `Survey_${slug}_${moment().tz('America/Guatemala').format('YYYYMMDDHHmmss')}.csv`
    const options = {
      Bucket: process.env.S3_CSV_BUCKET,
      Key: fileName,
      Body: csv,
      ACL: 'public-read',
      ContentType: 'application/csv;charset=utf-8',
    }
    const uploadImage = await s3.upload(options).promise()
    const dataS3 = await uploadImage
    console.log('Success', dataS3.Location)

    return dataS3.Location
  } catch (err) {
    console.error(err)
  }

  return ''
}

module.exports = {
  uploadToS3,
};
