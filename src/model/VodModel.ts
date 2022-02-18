import {ItemModel} from './ItemModel';

export interface VodModel extends ItemModel{
    stream_id: string;
    duration: string;
}