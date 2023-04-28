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

		$params = $request->get_json_params();

		if (!($params['url'] ?? '')) {
			return [];
		}

		$url = $params['url'];

		if (!empty(get_transient('sht_events_api_' . md5($url)))) {
			return get_transient('sht_events_api_' . md5($url));
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
			set_transient('sht_events_api_' . md5($url), $events, 60);
		}

		return $events;
	}
}
