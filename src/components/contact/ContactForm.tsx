
'use client';

import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import * as z from 'zod';
import { Button } from '@/components/ui/button';
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { useToast } from '@/hooks/use-toast';
import { ArrowRight, ArrowLeft } from 'lucide-react';
import { useTranslation } from '@/hooks/use-translation';

export function ContactForm() {
  const { toast } = useToast();
  const { t, language } = useTranslation();
  const arrowIcon = language === 'ar' ? <ArrowLeft /> : <ArrowRight />;

  const formSchema = z.object({
    name: z.string().min(2, t('form_error_name')),
    email: z.string().email(t('form_error_email')),
    phone: z.string().optional(),
    message: z.string().min(10, t('form_error_message')),
  });

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      name: '',
      email: '',
      phone: '',
      message: '',
    },
  });

    // Update resolver when language changes
  React.useEffect(() => {
    form.trigger();
  }, [t, form]);

  const onSubmit = (values: z.infer<typeof formSchema>) => {
    console.log(values);
    toast({
      title: t('toast_success_title'),
      description: t('toast_success_p'),
    });
    form.reset();
  };

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
        <FormField
          control={form.control}
          name="name"
          render={({ field }) => (
            <FormItem>
              <FormLabel>{t('form_label_name')}</FormLabel>
              <FormControl>
                <Input placeholder={t('form_placeholder_name')} {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="email"
          render={({ field }) => (
            <FormItem>
              <FormLabel>{t('form_label_email')}</FormLabel>
              <FormControl>
                <Input placeholder={t('form_placeholder_email')} {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
         <FormField
          control={form.control}
          name="phone"
          render={({ field }) => (
            <FormItem>
              <FormLabel>{t('form_label_phone')}</FormLabel>
              <FormControl>
                <Input placeholder={t('form_placeholder_phone')} {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="message"
          render={({ field }) => (
            <FormItem>
              <FormLabel>{t('form_label_message')}</FormLabel>
              <FormControl>
                <Textarea
                  placeholder={t('form_placeholder_message')}
                  className="min-h-[120px]"
                  {...field}
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <Button type="submit" size="lg" className="w-full">
          {t('send_inquiry')} {arrowIcon}
        </Button>
      </form>
    </Form>
  );
}
