export interface Speaker {
  name: string;
  nameNp?: string;
  domain: string;
  country: string;
  category: string;
  bio: string;
}

export const speakers: Speaker[] = [
  {
    name: 'Dr. Tapti Devi',
    nameNp: 'डा. तपती देवी',
    domain: 'Maithili Literature',
    country: 'Nepal',
    category: 'Writers & Thinkers',
    bio: 'Renowned Maithili author and literary scholar with over 30 years of experience in promoting regional literature.',
  },
  {
    name: 'Rajneh Saraogi',
    nameNp: 'रजनेह सारोगी',
    domain: 'Contemporary Fiction',
    country: 'India',
    category: 'Writers & Thinkers',
    bio: 'Award-winning novelist known for works exploring identity and cultural heritage in the Madhesh region.',
  },
  {
    name: 'Dr. Shila Mishra',
    nameNp: 'डा. शिला मिश्रा',
    domain: 'Linguistic Research',
    country: 'Nepal',
    category: 'Writers & Thinkers',
    bio: 'Leading researcher in regional languages and cultural documentation.',
  },
  {
    name: 'Ravi Kumar Jha',
    nameNp: 'रवि कुमार झा',
    domain: 'Bhojpuri Poetry',
    country: 'India',
    category: 'Poets',
    bio: 'Celebrated Bhojpuri poet whose work bridges traditional and modern poetic forms.',
  },
  {
    name: 'Sunita Thakur',
    nameNp: 'सुनीता ठाकुर',
    domain: 'Folk Music',
    country: 'Nepal',
    category: 'Performers',
    bio: 'Master folk musician preserving and performing traditional Madheshi musical heritage.',
  },
  {
    name: 'Anita Devi',
    nameNp: 'अनीता देवी',
    domain: 'Classical Dance',
    country: 'Nepal',
    category: 'Performers',
    bio: 'Renowned classical dancer specializing in traditional Madheshi dance forms.',
  },
  {
    name: 'Mohd. Jameel',
    nameNp: 'मोहम्मद जमील',
    domain: 'Urdu Ghazal',
    country: 'India',
    category: 'Poets',
    bio: 'Acclaimed Urdu ghazal artist with numerous national awards.',
  },
  {
    name: 'Prof. Ramesh Bikal',
    nameNp: 'प्रा. रमेश बिकल',
    domain: 'Nepali Literature',
    country: 'Nepal',
    category: 'Writers & Thinkers',
    bio: 'Senior professor and writer contributing significantly to Nepali literary discourse.',
  },
  {
    name: 'Sarah Thompson',
    domain: 'Cultural Anthropology',
    country: 'USA',
    category: 'International',
    bio: 'International researcher specializing in South Asian cultural studies.',
  },
  {
    name: 'Maya Rana',
    nameNp: 'माया राना',
    domain: 'Tharu Arts',
    country: 'Nepal',
    category: 'Performers',
    bio: 'Traditional Tharu artist promoting indigenous art forms and cultural preservation.',
  },
  {
    name: 'Kumar Singh',
    nameNp: 'कुमार सिंह',
    domain: 'Contemporary Poetry',
    country: 'Nepal',
    category: 'Poets',
    bio: 'Young poet exploring modern themes through traditional poetic structures.',
  },
  {
    name: 'Prof. Amrita Sharma',
    nameNp: 'प्रा. अमृता शर्मा',
    domain: 'Literary Criticism',
    country: 'India',
    category: 'International',
    bio: 'Distinguished literary critic and academic from India.',
  },
];

export const categories = ['All', 'Writers & Thinkers', 'Performers', 'Poets', 'International'];
