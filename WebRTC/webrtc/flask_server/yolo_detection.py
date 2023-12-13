import cv2
import numpy as np
import darknet

def convertBack(x, y, w, h):
    # Convert from center coordinates to bounding box coordinates
    xmin = int(round(x - (w / 2)))
    xmax = int(round(x + (w / 2)))
    ymin = int(round(y - (h / 2)))
    ymax = int(round(y + (h / 2)))
    return xmin, ymin, xmax, ymax

def performDetect(image, thresh=0.25, configPath="../darknet/cfg/yolov4-tiny-obj.cfg", weightPath="../darknet/backup/yolov4-tiny-obj_best.weights", metaPath="../darknet/data/obj.data"):
    # Load the network
    network, class_names, class_colors = darknet.load_network(
        configPath,
        metaPath,
        weightPath,
        batch_size=1
    )
    
    # Resize the image and convert to RGB
    width, height = darknet.network_width(network), darknet.network_height(network)
    darknet_image = darknet.make_image(width, height, 3)
    image_rgb = cv2.cvtColor(image, cv2.COLOR_BGR2RGB)
    image_resized = cv2.resize(image_rgb, (width, height), interpolation=cv2.INTER_LINEAR)

    # Copy the image data into the darknet image
    darknet.copy_image_from_bytes(darknet_image, image_resized.tobytes())

    # Perform the detection
    detections = darknet.detect_image(network, class_names, darknet_image, thresh=thresh)
    darknet.free_image(darknet_image)

    # Convert detections to dictionary
    detections_dict = []
    for label, confidence, bbox in detections:
        xmin, ymin, xmax, ymax = convertBack(float(bbox[0]), float(bbox[1]), float(bbox[2]), float(bbox[3]))
        detections_dict.append({
            "label": label,
            "confidence": float(confidence),
            "bbox": [xmin, ymin, xmax, ymax]
        })

    return detections_dict
