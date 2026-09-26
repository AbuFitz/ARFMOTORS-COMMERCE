// Credits for the Creative Commons demo product photos in /public/images/products.
// Shown on /credits. Remove an entry when you replace its photo with your own.

export interface ImageCredit {
  slug: string;
  title: string;
  author: string;
  license: string;
  licenseUrl: string | null;
  source: string;
}

export const IMAGE_CREDITS: ImageCredit[] = [
  {
    "slug": "front-rear-dash-cam-kit",
    "title": "Dashcams P1210466",
    "author": "Fernost",
    "license": "Public domain",
    "licenseUrl": "https://creativecommons.org/publicdomain/mark/1.0/",
    "source": "https://commons.wikimedia.org/wiki/File:Dashcams_P1210466.JPG"
  },
  {
    "slug": "wireless-reversing-camera-kit",
    "title": "Truck digital mirror right",
    "author": "KoeppiK",
    "license": "CC BY-SA 4.0",
    "licenseUrl": "https://creativecommons.org/licenses/by-sa/4.0",
    "source": "https://commons.wikimedia.org/wiki/File:Truck_digital_mirror_right.jpg"
  },
  {
    "slug": "dash-cam-hardwire-kit",
    "title": "Shield spider splitter with electric fuse. Spider distribution box with built-in electrical fuse. IP65 water protection according to IEC 60529.",
    "author": "Shield Connectors",
    "license": "CC BY-SA 2.0",
    "licenseUrl": "https://creativecommons.org/licenses/by-sa/2.0/",
    "source": "https://www.flickr.com/photos/45764919@N02/4250313101"
  },
  {
    "slug": "wireless-carplay-adapter",
    "title": "2023 Volkswagen ID.4 running wireless CarPlay",
    "author": "Sunnyboy122",
    "license": "CC0",
    "licenseUrl": "http://creativecommons.org/publicdomain/zero/1.0/deed.en",
    "source": "https://commons.wikimedia.org/wiki/File:2023_Volkswagen_ID.4_running_wireless_CarPlay.jpg"
  },
  {
    "slug": "bluetooth-obd2-code-reader",
    "title": "iCarsoft i930 Land Rover Jaguar Diagnosesystem - OBD2-Diagnose 07 Livewerte Citroen C6",
    "author": "KlausNahr",
    "license": "CC BY-SA 2.0",
    "licenseUrl": "https://creativecommons.org/licenses/by-sa/2.0/",
    "source": "https://www.flickr.com/photos/82756760@N00/16148477159"
  },
  {
    "slug": "magnetic-phone-mount",
    "title": "Smartphone mounted on car dashboard during a drive in a modern vehicle with a focus on navigation use",
    "author": "Shixart1985",
    "license": "CC BY 2.0",
    "licenseUrl": "https://creativecommons.org/licenses/by/2.0",
    "source": "https://commons.wikimedia.org/wiki/File:Smartphone_mounted_on_car_dashboard_during_a_drive_in_a_modern_vehicle_with_a_focus_on_navigation_use.jpg"
  },
  {
    "slug": "dual-usb-c-car-charger",
    "title": "Ugreen car charger USB-C USB-A 30W 25845",
    "author": "Qurren",
    "license": "CC BY-SA 4.0",
    "licenseUrl": "https://creativecommons.org/licenses/by-sa/4.0",
    "source": "https://commons.wikimedia.org/wiki/File:Ugreen_car_charger_USB-C_USB-A_30W_25845.jpg"
  },
  {
    "slug": "braided-usb-c-cable-2m-2-pack",
    "title": "USB-C cable 2017 A",
    "author": "Fructibus",
    "license": "CC0",
    "licenseUrl": "http://creativecommons.org/publicdomain/zero/1.0/deed.en",
    "source": "https://commons.wikimedia.org/wiki/File:USB-C_cable_2017_A.jpg"
  },
  {
    "slug": "bluetooth-aux-car-adapter",
    "title": "T10 Car Bluetooth FM Transmitter-0467",
    "author": "Raimond Spekking",
    "license": "CC BY-SA 4.0",
    "licenseUrl": "https://creativecommons.org/licenses/by-sa/4.0",
    "source": "https://commons.wikimedia.org/wiki/File:T10_Car_Bluetooth_FM_Transmitter-0467.jpg"
  },
  {
    "slug": "collapsible-boot-organiser",
    "title": "Trunk of Kia New Sonet during GIIAS 2026 in Bandung 20260913 184001",
    "author": "M Raisfath",
    "license": "CC BY 4.0",
    "licenseUrl": "https://creativecommons.org/licenses/by/4.0",
    "source": "https://commons.wikimedia.org/wiki/File:Trunk_of_Kia_New_Sonet_during_GIIAS_2026_in_Bandung_20260913_184001.jpg"
  },
  {
    "slug": "portable-jump-starter-power-bank",
    "title": "NOCO Genius Boost GB40 - Car Battery Booster Jump Starter (27189494027)",
    "author": "Tony Webster from Minneapolis, Minnesota, United States",
    "license": "CC BY 2.0",
    "licenseUrl": "https://creativecommons.org/licenses/by/2.0",
    "source": "https://commons.wikimedia.org/wiki/File:NOCO_Genius_Boost_GB40_-_Car_Battery_Booster_Jump_Starter_(27189494027).jpg"
  },
  {
    "slug": "cordless-digital-tyre-inflator",
    "title": "Inflating Temporary Spare - Tire Inflator - Air Compressor (54122728542)",
    "author": "Tony Webster",
    "license": "CC BY 2.0",
    "licenseUrl": "https://creativecommons.org/licenses/by/2.0",
    "source": "https://commons.wikimedia.org/wiki/File:Inflating_Temporary_Spare_-_Tire_Inflator_-_Air_Compressor_(54122728542).jpg"
  },
  {
    "slug": "roadside-emergency-kit",
    "title": "Red triangle of a car",
    "author": "Santeri Viinamäki",
    "license": "CC BY-SA 4.0",
    "licenseUrl": "https://creativecommons.org/licenses/by-sa/4.0",
    "source": "https://commons.wikimedia.org/wiki/File:Red_triangle_of_a_car.jpg"
  },
  {
    "slug": "digital-tyre-pressure-gauge",
    "title": "Porsche Tire Pressure Gauge (9207945919)",
    "author": "Antti",
    "license": "CC BY 2.0",
    "licenseUrl": "https://creativecommons.org/licenses/by/2.0",
    "source": "https://commons.wikimedia.org/wiki/File:Porsche_Tire_Pressure_Gauge_(9207945919).jpg"
  },
  {
    "slug": "rechargeable-led-work-light",
    "title": "LED black light flashlight",
    "author": "El Grafo",
    "license": "CC BY-SA 4.0",
    "licenseUrl": "https://creativecommons.org/licenses/by-sa/4.0",
    "source": "https://commons.wikimedia.org/wiki/File:LED_black_light_flashlight.jpg"
  },
  {
    "slug": "digital-multimeter",
    "title": "2017 Cyfrowy miernik uniwersalny",
    "author": "Jacek Halicki",
    "license": "CC BY-SA 4.0",
    "licenseUrl": "https://creativecommons.org/licenses/by-sa/4.0",
    "source": "https://commons.wikimedia.org/wiki/File:2017_Cyfrowy_miernik_uniwersalny.jpg"
  },
  {
    "slug": "compact-car-tool-kit",
    "title": "Mechanic's tool set with three socket wrenches and a variety of sockets from Blackhawk (cropped)",
    "author": "J.C. Fields",
    "license": "CC BY-SA 3.0",
    "licenseUrl": "https://creativecommons.org/licenses/by-sa/3.0",
    "source": "https://commons.wikimedia.org/wiki/File:Mechanic%27s_tool_set_with_three_socket_wrenches_and_a_variety_of_sockets_from_Blackhawk_(cropped).jpg"
  }
];
