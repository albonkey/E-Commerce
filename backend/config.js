export default {
  MONGODB_URL: process.env.MONGODB_URL || 'mongodb+srv://albonkey:Manchester_12377@webshop.isrgn.mongodb.net/<dbname>?retryWrites=true&w=majority',
  JWT_SECRET: process.env.JWT_SECRET || 'somethingsecret',
  BRAINTREE_MERCHANT_ID: process.env.BRAINTREE_MERCHANT_ID || 'wkx368364mvsnftm',
  BRAINTREE_PUBLIC_KEY: process.env.BRAINTREE_PUBLIC_KEY || 'gp9dg2sdzp9dwkjw',
  BRAINTREE_PRIVATE_KEY: process.env.BRAINTREE_PRIVATE_KEY ||'c4214c5989cfd6ee78319d7a3341f9bf',
}
