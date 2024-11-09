import { FC } from 'react';
import { Container } from '../../components/styled-system/jsx';
import { Text } from '../../components/text.tsx';
import { Accordion } from '../../components/accordion.tsx';
import { ChevronDownIcon } from 'lucide-react';

const faqData = [
  {
    question: 'Is TMDB for AN Player free?',
    answer: 'Yes, TMDB for AN Player is completely free.',
  },
  {
    question: 'What movie quality formats are supported by the plugin?',
    answer: 'Supported formats include mp4, mkv, and m4v.',
  },
  {
    question:
      'Can I use this plugin on multiple devices with a single installation?',
    answer:
      'No, your data is only stored on the device where the plugin is installed.',
  },
  {
    question: 'Is TMDB for AN Player compatible with iOS?',
    answer: 'No, it is only compatible with Android devices.',
  },
  {
    question: 'Are there any subscription fees or hidden costs?',
    answer: 'No, TMDB for AN Player is entirely free to use.',
  },
  {
    question: 'How frequently is the plugin updated?',
    answer:
      'We regularly update the plugin to include improvements and bug fixes.',
  },
  {
    question:
      'Are there any region restrictions for accessing content through the plugin?',
    answer: 'No, there are no region restrictions.',
  },
  {
    question: 'Do I need a TMDB account to use this plugin?',
    answer: 'No, a TMDB account is not required to use the plugin.',
  },
  {
    question:
      'Is my personal data shared with third parties when using the plugin?',
    answer: 'No, we do not share your personal data with third parties.',
  },
  {
    question: 'Can I customize the plugin settings to suit my preferences?',
    answer: 'Yes, you can customize the plugin settings to your liking.',
  },
  {
    question:
      'Are there any special system requirements for using the plugin effectively?',
    answer: 'You only need an internet connection to use the plugin.',
  },
  {
    question:
      'How do I report issues or seek support if I encounter problems with the plugin?',
    answer: 'You can contact us via email for support.',
  },
  {
    question:
      'Is the plugin compatible with other streaming services like Netflix, Hulu, or Amazon Prime Video?',
    answer:
      'No, the plugin is standalone and not compatible with other streaming services.',
  },
];

export const FaqPage: FC = () => {
  return (
    <Container maxW="2xl">
      <Text fontSize="2xl" fontWeight="bold" mb="4">
        Frequently Asked Questions
      </Text>
      <Accordion.Root>
        {faqData.map((item, index) => (
          <Accordion.Item key={index} value={index.toString()}>
            <Accordion.ItemTrigger>
              {item.question}
              <Accordion.ItemIndicator>
                <ChevronDownIcon />
              </Accordion.ItemIndicator>
            </Accordion.ItemTrigger>
            <Accordion.ItemContent>{item.answer}</Accordion.ItemContent>
          </Accordion.Item>
        ))}
      </Accordion.Root>
    </Container>
  );
};
