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