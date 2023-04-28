<?php

namespace SayHello\Theme\Blocks\EventsAPI;

use WP_REST_Request;
use WP_REST_Response;
use WP_REST_Server;

class Block
{
	public function run()
	{
		add_action('init', [$this, 'register']);
		add_action('rest_api_init', [$this, 'registerRestRoute']);
	}

	public function register()
	{
		register_block_type(__DIR__);
	}

	public function registerRestRoute()
	{
		register_rest_route(
			'sht/v1',
			'/events',
			[
				'methods' => WP_REST_Server::CREATABLE,
				'callback' => [$this, 'getEvents'],
				'permission_callback' => '__return_true',
				'args'     => [
					'url' => [
						'required' => true,
						'type' => 'string',
					]
				]
			]
		);
	}

	public function getEvents(WP_REST_Request $request)
	{

		return json_decode('{"sandboxed":false,"error":null,"location":{"country":"CH"},"events":[{"type":"meetup","title":"Bilder in WordPress einbauen und NextGen Gallery (Hybrid)","url":"https:\/\/www.meetup.com\/wp-meetup-ticino-mobile\/events\/291542565","meetup":"wp meetup ticino mobile","meetup_url":"https:\/\/www.meetup.com\/wp-meetup-ticino-mobile\/","date":"2023-04-28 20:00:00","end_date":"2023-04-28 21:00:00","start_unix_timestamp":1682704800,"end_unix_timestamp":1682708400,"location":{"location":"Online","country":"CH","latitude":46.2,"longitude":9.02}},{"type":"meetup","title":"Quoi de neuf avec la nouvelle version WP 6.2","url":"https:\/\/www.meetup.com\/lausanne-wordpress-meetup\/events\/292991777","meetup":"Lausanne WordPress Meetup","meetup_url":"https:\/\/www.meetup.com\/Lausanne-WordPress-Meetup\/","date":"2023-05-03 18:30:00","end_date":"2023-05-03 20:00:00","start_unix_timestamp":1683131400,"end_unix_timestamp":1683136800,"location":{"location":"Lausanne, Switzerland","country":"ch","latitude":46.516514,"longitude":6.625851}},{"type":"meetup","title":"WordPress f\u00eate ses 20 ans \/ WordPress is 20 years old \/ Big meetup","url":"https:\/\/www.meetup.com\/geneva-wordpress\/events\/291424395","meetup":"WordPress Meetups Gen\u00e8ve (Geneva)","meetup_url":"https:\/\/www.meetup.com\/geneva-wordpress\/","date":"2023-05-27 13:00:00","end_date":"2023-05-27 19:00:00","start_unix_timestamp":1685185200,"end_unix_timestamp":1685206800,"location":{"location":"Gen\u00e8ve, Switzerland","country":"ch","latitude":46.21664,"longitude":6.148071}},{"type":"meetup","title":"WordPress Q2\/2023 Meetup #WP20","url":"https:\/\/www.meetup.com\/wordpress-zurich\/events\/293022211","meetup":"WordPress Zurich","meetup_url":"https:\/\/www.meetup.com\/WordPress-Zurich\/","date":"2023-06-01 19:00:00","end_date":"2023-06-01 22:00:00","start_unix_timestamp":1685638800,"end_unix_timestamp":1685649600,"location":{"location":"Z\u00fcrich, Switzerland","country":"ch","latitude":47.39335,"longitude":8.51216}}]}');

		$params = $request->get_json_params();

		if (!($params['url'] ?? '')) {
			return [];
		}

		$url = $params['url'];
		$transient_key = 'sht_events_api_' . md5($url);

		if (!empty(get_transient($transient_key))) {
			return get_transient($transient_key);
		}

		$curl = curl_init($params['url']);
		curl_setopt($curl, CURLOPT_HEADER, false);
		curl_setopt($curl, CURLOPT_RETURNTRANSFER, true);
		curl_setopt($curl, CURLOPT_HTTPHEADER, ["Content-type: application/json"]);
		curl_setopt($curl, CURLOPT_SSL_VERIFYPEER, false);
		curl_setopt($curl, CURLOPT_SSL_VERIFYHOST, 0);

		$response = curl_exec($curl);
		$status = curl_getinfo($curl, CURLINFO_HTTP_CODE);

		curl_close($curl);

		dump($response, 1);

		if ((int) $status !== 200) {
			if (!empty($response)) {
				return new WP_REST_Response(['error', "call to URL $url failed with status $status // response $response // curl_error: " . curl_error($curl) . ", curl_errno: " . curl_errno($curl) . " // HTTP-Status: " . $status], $status);
			} else {
				return new WP_REST_Response(['success', $response]);
			}
		}

		$data = json_decode($response, true);
		$events = $data['events'] ?? [];

		if (!empty($events)) {
			set_transient($transient_key, $events, 60);
		}

		return $events;
	}
}
