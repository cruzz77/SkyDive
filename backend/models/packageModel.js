import mongoose from 'mongoose';

const packageSchema = new mongoose.Schema({
    name: { type: String, required: true },
    price: { type: Number, required: true },
    altitude: { type: Number, required: true },
    difficulty: { type: String, required: true },
    weather: { type: String, required: true },
    features: { type: [String], required: true },
    image: { type: String, default: '' }
}, { timestamps: true });

const packageModel = mongoose.models.Package || mongoose.model('Package', packageSchema);

export default packageModel;
