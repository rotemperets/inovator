'use strict';

/**
 * Module dependencies.
 */
var mongoose = require('mongoose'),
	Schema = mongoose.Schema;

/**
 * Article Schema
 */
var ArticleSchema = new Schema({
	created: {
		type: Date,
		default: Date.now
	},
	title: {
		type: String,
		default: '',
		trim: true,
		required: 'Title cannot be blank'
	},
	content: {
		type: String,
		default: '',
		trim: true
	},
	user: {
            type: Schema.ObjectId,
            ref: 'User'
	},
    userMail: {
        type: Schema.ObjectId,
        ref: 'user'
    },
    members: {
        type: Array,
        default: []
    }

});

mongoose.model('Article', ArticleSchema);