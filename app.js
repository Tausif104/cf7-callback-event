<?php 

function cf7_list_elementor(){
    
    $args = wp_parse_args( array(
        'post_type' => 'wpcf7_contact_form',
        'numberposts'  =>  -1,
    ));
    $posts = get_posts( $args );
    $post_options = [];
    if($posts){
        foreach( $posts as $post ){
            $post_options[ $post->ID] = $post->post_title;}
    }
    return $post_options;
    
}

class Contact_form extends \Elementor\Widget_Base {

    public function get_name() {
        return 'contact-form';
    }

    public function get_title() {
        return __( 'Contact Form', 'plugin-name' );
    }

    public function get_icon() {
        return 'fa fa-code';
    }

    public function get_categories() {
        return [ 'creativepeoples' ];
    }

    protected function _register_controls() {

        $this->start_controls_section(
            'content_section_contact_form',
            [
                'label' => __( 'Content', 'plugin-name' ),
                'tab' => \Elementor\Controls_Manager::TAB_CONTENT,
            ]
        );

        $this->add_control(
            'select_cf7',
            [
                'label' => __( 'Select Contact Form', 'plugin-name' ),
                'type' => \Elementor\Controls_Manager::SELECT,
                'options' => cf7_list_elementor(),
                'label_block' => true,
            ]
        );

        $this->add_control(
            'contact_form_popup_text',
            [
                'label' => __( 'Popup Text', 'plugin-name' ),
                'type' => \Elementor\Controls_Manager::TEXT,
                'default' => 'We have received your email successfully.',
                'label_block' => true,
            ]
        );


        $this->end_controls_section();

    }

    protected function render() {

        $settings = $this->get_settings_for_display();

?>

        <style>
            .popup-contact-form {
                display: none;
                position: fixed;
                top: 0;
                left: 0;
                width: 100%;
                height: 100%;
                background-color: #000000ed;
                z-index: 2;
            }

            .popup-contact-form-inner {
                max-width: 500px;
                background-color: #fff;
                text-align: center;
                position: absolute;
                top: 50%;
                left: 50%;
                transform: translateY(-50%) translateX(-50%);
                padding: 75px;
                border-radius: 10px;
            }

            .popup-contact-form-inner h3 {
                color: #333;
            }

            .popup-contact-form-inner span {
                color: #32ce32;
                font-size: 45px;
            }

            .popup-contact-form.active {
                display: block;
            }

            span.close-contact-popup {
                position: absolute;
                right: -15px;
                top: -15px;
                font-size: 20px;
                color: #333;
                background-color: #fff;
                box-shadow: 0 0 20px #00000073;
                width: 45px;
                display: inline-block;
                height: 45px;
                line-height: 45px;
                border-radius: 50px;
                cursor: pointer;
            }

            .wpcf7-response-output {
                display: none;
            }

        </style>


        <div class="popup-contact-form">
            <div class="popup-contact-form-inner">
                <span class="close-contact-popup"><i class="fas fa-times"></i></span>
                <h3><?php echo $settings['contact_form_popup_text']; ?></h3>
                <span><i class="fas fa-check-circle"></i></span>
            </div>
        </div>

        <section class="form form-wrapper">
            <div class="row">
                <div class="col-md-12">
                    <div class="contact-form">
                        <?php 
                        $get_cf7 = get_post( $settings['select_cf7'] ); 
                        $title = $get_cf7->post_title;
                        ?>
                        <?php echo do_shortcode( '[contact-form-7 id="'.$settings['select_cf7'].'" title="'.$title.'"]') ?>
                    </div>
                </div>
            </div>
        </section>

        <script>
            const submitForm = document.querySelector('#wpcf7-f<?php echo $settings['select_cf7']; ?>-o1')
            const popUp = document.querySelector('.popup-contact-form')
            const closePopUp = document.querySelector('.close-contact-popup')

            submitForm.addEventListener('wpcf7mailsent',
                (e) => {
                    popUp.classList.add('active')
                },
                false
            )

            closePopUp.addEventListener('click', () => {
                popUp.classList.remove('active')
            })
        </script>

<?php

    }

}
