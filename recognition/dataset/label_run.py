# -*- coding: utf-8 -*-
"""
Created on Mon Jan 29 20:31:52 2018

@author: TOKIMASA
"""

import label_image

image_data = label_image.load_image('alopias_superciliosus_01.jpg')
labels = label_image.load_labels('retrained_labels_2.txt')
label_image.load_graph('retrained_graph_2.pb')

input_layer = 'DecodeJpeg/contents:0'
output_layer = 'final_result:0'
num_top_predictions = 5

label_dict = label_image.run_graph(image_data, labels, input_layer, output_layer,
              num_top_predictions)

input_dict = {'image_name':'xxx','longitude':'-0.703107, -120.9375','ocean_name':''}
input_dict_ = {'image_name':'xxx','longitude':'','ocean_name':'Pacific Ocean'}

ocean_name = get_location(input_dict_)
species_name = label_dict['species']

label_dict['ban_boolean'] = get_banboolean(species_name,ocean_name)